from sqlalchemy import text, inspect
from app.core.database import engine

# Drop all existing tables
with engine.connect() as conn:
    # Get all table names
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    
    print(f"Found {len(tables)} tables to drop")
    
    if tables:
        # Disable foreign key checks temporarily
        conn.execute(text('SET FOREIGN_KEY_CHECKS=0'))
        
        # Drop all tables
        for table in tables:
            conn.execute(text(f'DROP TABLE IF EXISTS `{table}`'))
            print(f"  ✓ Dropped {table}")
        
        # Re-enable foreign key checks
        conn.execute(text('SET FOREIGN_KEY_CHECKS=1'))
        conn.commit()
        
    print('\n✓ All tables dropped successfully')
