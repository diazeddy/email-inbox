import { Router, Response, Request, NextFunction } from "express";
import pg from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'developer2020!A',
    port: 5432,
});

const router = Router();

interface User extends Request {
    id: number;
    email: string;
    password: string;
}

interface Email extends Request {
    id: number;
    title:string;
    sender_id: number;
    receiver_id: number;
    thread_id: number;
    content: string;
    is_read: boolean;
    is_trashed: boolean;
    created_at: Date;
}

interface UserPayload {
    userId: number;
    email: string;
}
interface AuthenticatedRequest extends Request {
    user?: UserPayload;
}

// Initialize the sample schemas and tables in a function

const createTableUsers = `
    CREATE SCHEMA IF NOT EXISTS inbox;
    CREATE TABLE IF NOT EXISTS inbox.users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
`;

const createTableEmails = `
    CREATE SCHEMA IF NOT EXISTS inbox;
    CREATE TABLE IF NOT EXISTS inbox.emails (
        id SERIAL PRIMARY KEY,
        sender_id INTEGER,
        receiver_id INTEGER,
        thread_id INTEGER,
        title VARCHAR(255),
        content TEXT,
        is_read BOOLEAN DEFAULT FALSE,
        is_trashed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const createTableEmailThreads = `
    CREATE SCHEMA IF NOT EXISTS inbox;
    CREATE TABLE IF NOT EXISTS inbox.email_threads (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        email_id INTEGER
    );
`;

const createTables = async () => {
    const client = await pool.connect();
    try {
        await client.query(createTableUsers);
        await client.query(createTableEmails);
        await client.query(createTableEmailThreads);
        console.log('Tables created successfully!');
    } catch (err) {
        console.error('Error creating tables:', err);
    } finally {
        client.release();
    }
}

createTables();

// Middleware for checking JWT tokens
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user as UserPayload;
        next();
    });
};

// User registration
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email.endsWith('@hometask.com')) return res.status(400).json({ message: 'Invalid email domain' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query('INSERT INTO inbox.users (email, password) VALUES ($1, $2) RETURNING id', [email, hashedPassword]);
    res.status(201).json({ userId: result.rows[0].id });
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM inbox.users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, 'your_secret_key');
    res.json({ token });
});
  
// Get emails for authenticated user
router.get('/emails', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    const result = await pool.query('SELECT * FROM inbox.emails WHERE receiver_id = $1 AND is_trashed = FALSE', [req.user!.userId]);
    res.json(result.rows);
});
  
// View email content
router.get('/emails/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    const result = await pool.query('SELECT * FROM inbox.emails WHERE id = $1 AND receiver_id = $2', [req.params.id, req.user!.userId]);
    res.json(result.rows[0]);
});
  
// Send new email
router.post('/emails', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    console.log("@@@here", req);
    console.log("@@@userid", req.user);
    const { receiverEmail, title, content } = req.body;

    if (!receiverEmail.endsWith('@hometask.com')) return res.status(400).json({ message: 'Invalid email domain' });

    const receiverResult = await pool.query('SELECT id FROM inbox.users WHERE email = $1', [receiverEmail]);
    const receiverId = receiverResult.rows[0]?.id;
    if (!receiverId) return res.status(404).json({ message: 'Receiver not found' });

    const result = await pool.query(
        'INSERT INTO inbox.emails (sender_id, receiver_id, title, content) VALUES ($1, $2, $3, $4) RETURNING id',
        [req.user!.userId, receiverId, title, content]
    );
    res.status(201).json({ emailId: result.rows[0].id });
});
  
// Mark email as read/unread
router.patch('/emails/:id/read', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    const { isRead } = req.body;
    await pool.query('UPDATE inbox.emails SET is_read = $1 WHERE id = $2 AND receiver_id = $3', [isRead, req.params.id, req.user!.userId]);
    res.sendStatus(204);
});
  
// Move email to/from trash
router.patch('/emails/:id/trash', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    const { isTrashed } = req.body;
    await pool.query('UPDATE inbox.emails SET is_trashed = $1 WHERE id = $2 AND receiver_id = $3', [isTrashed, req.params.id, req.user!.userId]);
    res.sendStatus(204);
});
  
// Search emails
router.get('/emails/search', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    const { query } = req.query;
    const result = await pool.query(
        `SELECT * FROM inbox.emails 
        WHERE receiver_id = $1 AND (title ILIKE $2 OR content ILIKE $2) AND is_trashed = FALSE`,
        [req.user!.userId, `%${query}%`]
    );
    res.json(result.rows);
});
  
// Reply to an email
router.post('/emails/:id/reply', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    const { content } = req.body;
    const emailResult = await pool.query('SELECT * FROM inbox.emails WHERE id = $1 AND receiver_id = $2', [req.params.id, req.user!.userId]);
    const originalEmail = emailResult.rows[0];

    const result = await pool.query(
        'INSERT INTO inbox.emails (sender_id, receiver_id, thread_id, title, content) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [req.user!.userId, originalEmail.sender_id, originalEmail.thread_id || originalEmail.id, `RE: ${originalEmail.title}`, content]
    );
    res.status(201).json({ emailId: result.rows[0].id });
});

// Filter emails by read/unread status
router.get('/emails/filter', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    const { isRead } = req.query;
    const result = await pool.query(
        'SELECT * FROM inbox.emails WHERE receiver_id = $1 AND is_read = $2 AND is_trashed = FALSE',
        [req.user!.userId, isRead]
    );
    res.json(result.rows);
});


export default router;