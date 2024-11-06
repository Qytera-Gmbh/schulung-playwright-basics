resource "aws_s3_bucket" "application" {
  bucket = var.app.data_bucket.name

  tags = var.common_tags
}
