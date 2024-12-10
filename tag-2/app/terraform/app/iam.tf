# The role for Fargate/ECS. It typically requires access to ECR to setup up containers.
# See: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html
resource "aws_iam_role" "task_execution_role" {
  name = "${var.app.name}-task-execution-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      },
    ]
  })
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  ]

  tags = var.common_tags
}

# The role for the tasks themselves. For example, a container may need to access S3 for storage.
# See: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html
resource "aws_iam_role" "task_role" {
  name = "${var.app.name}-task-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Condition = {
          StringEquals = {
            "aws:SourceAccount" = "${var.aws_org_id}"
          }
        }
      },
    ]
  })
  managed_policy_arns = [
    aws_iam_policy.application_data_bucket_access.arn
  ]

  tags = var.common_tags
}

data "aws_iam_policy_document" "application_data_bucket_access" {
  statement {
    sid    = "AllowBucketAccess"
    effect = "Allow"

    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:ListBucket",
      "s3:DeleteObject"
    ]

    resources = [
      aws_s3_bucket.application.arn,
      "${aws_s3_bucket.application.arn}/*"
    ]
  }
}

resource "aws_iam_policy" "application_data_bucket_access" {
  name   = "${var.app.name}-s3-access"
  policy = data.aws_iam_policy_document.application_data_bucket_access.json

  tags = var.common_tags
}
