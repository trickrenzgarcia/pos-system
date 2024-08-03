CREATE TABLE IF NOT EXISTS "product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"price" real DEFAULT 0 NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"category" text NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "product_slug_unique" UNIQUE("slug")
);
