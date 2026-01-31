from sqlalchemy import String, Boolean, DateTime, ForeignKey, Numeric, table
from sqlalchemy.orm import relationship, Mapped, mapped_column
from datetime import datetime
from app.core.database import Base


class Categories(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    parent_id: Mapped[int] =mapped_column(ForeignKey('categories.id',ondelete='CASCADE'),nullable=True)
    description: Mapped[str | None] = mapped_column(String(500))
    image: Mapped[str | None] = mapped_column(String(400))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, index=True)

    products: Mapped[list["Products"]] = relationship(back_populates="category")



class ProductCategories(Base):
    __tablename__ = "product_categories"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey('products.id', ondelete='CASCADE'), nullable=False)
    category_id: Mapped[int] = mapped_column(ForeignKey('categories.id', ondelete='CASCADE'), nullable=False)


class Brand(Base):
    __table__="brands"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(225))
    slug: Mapped[str] = mapped_column(String(225), index=True,nullable=False,unique=True )
    description: Mapped[str | None] = mapped_column(String(500))
    image: Mapped[str] = mapped_column(String(300),nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, index=True)

class Products(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    brand_id: Mapped[int] = mapped_column(ForeignKey('brands.id',ondelete='CASCADE'))
    description: Mapped[str | None] = mapped_column(String(1000))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, index=True)

    category: Mapped["Categories"] = relationship(back_populates="products")
    images: Mapped[list["ProductImages"]] = relationship(back_populates="product")
    inventory: Mapped["Inventories"] = relationship(
        back_populates="product", uselist=False, cascade="all, delete-orphan"
    )

class ProductVariants(Base):
    __tablename__ = "product_variants"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    sku: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    base_price: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    stock_quantity: Mapped[int] = mapped_column(Integer, default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Attributes(Base):
    __tablename__ = "attributes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)


class AttributeValues(Base):
    __tablename__ = "attribute_values"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    attribute_id: Mapped[int] = mapped_column(ForeignKey("attributes.id", ondelete="CASCADE"), nullable=False)
    value: Mapped[str] = mapped_column(String(255), nullable=False)


class ProductVariantAttributes(Base):
    __tablename__ = "product_variant_attributes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    product_variant_id: Mapped[int] = mapped_column(ForeignKey("product_variants.id", ondelete="CASCADE"), nullable=False)
    attribute_value_id: Mapped[int] = mapped_column(ForeignKey("attribute_values.id", ondelete="CASCADE"), nullable=False)

    __table_args__ = (Index('product_variant_id', 'attribute_value_id', unique=True),)



class ProductImages(Base):
    __tablename__ = "product_images"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"))
    image_url: Mapped[str] = mapped_column(String(400), nullable=False)
    is_primary: Mapped[bool] = mapped_column(Boolean, default=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, index=True)

    product: Mapped["Products"] = relationship(back_populates="images")


class Inventories(Base):
    __tablename__ = "inventories"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"))
    quantity: Mapped[int] = mapped_column(nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, index=True)

    product: Mapped["Products"] = relationship(back_populates="inventory")
