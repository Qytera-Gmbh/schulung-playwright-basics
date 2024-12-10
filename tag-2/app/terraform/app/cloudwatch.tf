resource "aws_cloudwatch_log_group" "logs" {
  name              = "/fargate/service/${var.app.name}"
  retention_in_days = 14
  tags              = var.common_tags
}
