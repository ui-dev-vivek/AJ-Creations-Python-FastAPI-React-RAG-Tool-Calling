from sqlalchemy import text
from app.core.database import engine

# Drop alembic_version table
with engine.connect() as conn:
    conn.execute(text('DROP TABLE IF EXISTS alembic_version'))
    conn.commit()
    print('✓ alembic_version table dropped')
