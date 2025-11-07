import sqlite3
from datetime import datetime

DB_PATH = "database/predictions.db"

def get_connection():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    conn.execute('''CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image_name TEXT,
        prediction TEXT,
        confidence REAL,
        probs TEXT,
        created_at TEXT
    )''')
    conn.commit()
    conn.close()

init_db()
