data "aws_acm_certificate" "root" {
  domain   = var.domain
  statuses = ["ISSUED"]

  provider = aws.virginia
}
