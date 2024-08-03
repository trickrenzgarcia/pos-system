CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"icon" text NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "category_slug_unique" UNIQUE("slug"),
	CONSTRAINT "category_category_unique" UNIQUE("category")
);
