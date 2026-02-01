from sqlalchemy import String, Boolean, DateTime, ForeignKey, Numeric, Integer, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column
from datetime import datetime
from app.core.database import Base


class Categories(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    parent_id: Mapped[int | None] = mapped_column(ForeignKey('categories.id', ondelete='CASCADE'), nullable=True)
    description: Mapped[str | None] = mapped_column(String(500))
    image: Mapped[str | None] = mapped_column(String(400))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, index=True)

    # One to Many (self-referencing)
    parent: Mapped['Categories | None'] = relationship(
        'Categories',
        remote_side=[id],
        back_populates='children',
        foreign_keys=[parent_id]
    )
    children: Mapped[list["Categories"]] = relationship(
        'Categories',
        back_populates="parent",
        cascade='all, delete-orphan',
        foreign_keys=[parent_id]
    )
    
    # One to Many
    products: Mapped[list["Products"]] = relationship(back_populates="category")



class ProductCategories(Base):
    __tablename__ = "product_categories"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey('products.id', ondelete='CASCADE'), nullable=False)
    category_id: Mapped[int] = mapped_column(ForeignKey('categories.id', ondelete='CASCADE'), nullable=False)
    
    # Many to Many (junction table)
    product: Mapped["Products"] = relationship(back_populates="product_categories")
    category: Mapped["Categories"] = relationship()


class Brand(Base):
    __tablename__ = "brands"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(225))
    slug: Mapped[str] = mapped_column(String(225), index=True, nullable=False, unique=True)
    description: Mapped[str | None] = mapped_column(String(500))
    image: Mapped[str | None] = mapped_column(String(300), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, index=True)
    
    # One to Many
    products: Mapped[list["Products"]] = relationship(back_populates="brand")
    

class Products(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    brand_id: Mapped[int | None] = mapped_column(ForeignKey('brands.id', ondelete='CASCADE'), nullable=True)
    description: Mapped[str | None] = mapped_column(String(5000))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, index=True)
    
    # Many to One
    brand: Mapped["Brand"] = relationship(back_populates="products")
    
    # Many to One
    category: Mapped["Categories"] = relationship(back_populates="products")
    
    # One to Many
    images: Mapped[list["ProductImages"]] = relationship(back_populates="product", cascade="all, delete-orphan")
    
    # One to One
    inventory: Mapped["Inventories"] = relationship(
        back_populates="product", uselist=False, cascade="all, delete-orphan"
    )
    
    # One to Many
    variants: Mapped[list["ProductVariants"]] = relationship(back_populates="product", cascade="all, delete-orphan")
    
    # One to Many
    videos: Mapped[list["ProductVideos"]] = relationship(back_populates="product", cascade="all, delete-orphan")

    # Many to Many (junction table)
    product_categories: Mapped[list["ProductCategories"]] = relationship(back_populates="product")


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
    
    # Many to One
    product: Mapped["Products"] = relationship(back_populates="variants")
    
    # One to Many
    variant_attributes: Mapped[list["ProductVariantAttributes"]] = relationship(
        back_populates="product_variant", cascade="all, delete-orphan"
    )


class Attributes(Base):
    __tablename__ = "attributes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    
    # One to Many
    attribute_values: Mapped[list["AttributeValues"]] = relationship(back_populates="attribute", cascade="all, delete-orphan")


class AttributeValues(Base):
    __tablename__ = "attribute_values"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    attribute_id: Mapped[int] = mapped_column(ForeignKey("attributes.id", ondelete="CASCADE"), nullable=False)
    value: Mapped[str] = mapped_column(String(255), nullable=False)
    
    # Many to One
    attribute: Mapped["Attributes"] = relationship(back_populates="attribute_values")
    
    # One to Many
    variant_attributes: Mapped[list["ProductVariantAttributes"]] = relationship(
        back_populates="attribute_value", cascade="all, delete-orphan"
    )


class ProductVariantAttributes(Base):
    __tablename__ = "product_variant_attributes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    product_variant_id: Mapped[int] = mapped_column(
        ForeignKey("product_variants.id", ondelete="CASCADE"), nullable=False, index=True
    )
    attribute_value_id: Mapped[int] = mapped_column(
        ForeignKey("attribute_values.id", ondelete="CASCADE"), nullable=False, index=True
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    __table_args__ = (
        UniqueConstraint('product_variant_id', 'attribute_value_id', name='uq_variant_attribute'),
    )
    
    # Many to Many (junction table)
    product_variant: Mapped["ProductVariants"] = relationship(back_populates="variant_attributes")
    attribute_value: Mapped["AttributeValues"] = relationship(back_populates="variant_attributes")


class ProductImages(Base):
    __tablename__ = "product_images"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    image_url: Mapped[str] = mapped_column(String(400), nullable=False)
    is_primary: Mapped[bool] = mapped_column(Boolean, default=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, index=True)

    # Many to One
    product: Mapped["Products"] = relationship(back_populates="images")


class ProductVideos(Base):
    __tablename__ = "product_videos"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    video_url: Mapped[str] = mapped_column(String(400), nullable=False)
    title: Mapped[str | None] = mapped_column(String(255))

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, index=True)

    # Many to One
    product: Mapped["Products"] = relationship(back_populates="videos")


class Inventories(Base):
    __tablename__ = "inventories"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, index=True)

    # One to One
    product: Mapped["Products"] = relationship(back_populates="inventory")