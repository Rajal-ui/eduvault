import sys
sys.path.append('d:/eduvault/backend')
from app.database import engine
from sqlalchemy import text

try:
    with engine.connect() as conn:
        conn.execute(text("ALTER TABLE Students ADD COLUMN StudentPhone VARCHAR(100);"))
        conn.commit()
        print("Column added successfully")
except Exception as e:
    print("Error (or column already exists):", e)
