resource "aws_ecs_cluster" "application" {
  name = var.app.name

  tags = var.common_tags
}

resource "aws_ecs_task_definition" "application_task" {
  family                   = var.app.name
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  execution_role_arn       = aws_iam_role.task_execution_role.arn
  task_role_arn            = aws_iam_role.task_role.arn

  container_definitions = jsonencode([
    {
      name      = var.app.name
      image     = "docker.io/mattermost/mattermost-team-edition:9.11"
      cpu       = 1024
      memory    = 2048
      essential = true

      portMappings = [
        {
          containerPort = 8065
          hostPort      = 8065
        },
        {
          containerPort = 443
          hostPort      = 443
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/fargate/service/${var.app.name}",
          awslogs-region        = var.region,
          awslogs-stream-prefix = "ecs"
        }
      }

      environment = [
        # https://docs.mattermost.com/configure/environment-configuration-settings.html
        {
          name  = "TZ",
          value = "UTC"
        },
        {
          name  = "MM_SQLSETTINGS_DRIVERNAME",
          value = "postgres"
        },
        {
          name  = "MM_SQLSETTINGS_DATASOURCE",
          value = "postgres://${aws_db_instance.application.username}:${aws_db_instance.application.password}@${aws_db_instance.application.address}:${aws_db_instance.application.port}/${aws_db_instance.application.db_name}"
        },
        {
          name  = "MM_LOGSETTINGS_ENABLEDIAGNOSTICS",
          value = "false"
        },
        {
          name  = "MM_EMAILSETTINGS_SENDPUSHNOTIFICATIONS",
          value = "false"
        },
        {
          name  = "MM_SERVICESETTINGS_SITEURL",
          value = "https://${var.app.name}.${var.domain}"
        },
        {
          name  = "MM_BLEVESETTINGS_INDEXDIR",
          value = "/mattermost/bleve-indexes"
        },
        {
          name  = "MATTERMOST_CONTAINER_READONLY",
          value = "false"
        },
        # https://docs.mattermost.com/configure/environment-configuration-settings.html#amazon-s3-bucket
        {
          name  = "MM_FILESETTINGS_DRIVERNAME",
          value = "amazons3"
        },
        {
          name  = "MM_FILESETTINGS_AMAZONS3REGION",
          value = var.region
        },
        {
          name  = "MM_FILESETTINGS_AMAZONS3BUCKET",
          value = aws_s3_bucket.application.id
        },
        {
          name  = "MM_FILESETTINGS_AMAZONS3PATHPREFIX",
          value = ""
        }
      ]

    }
  ])

  tags = var.common_tags
}

resource "aws_ecs_service" "application" {
  name            = var.app.name
  cluster         = aws_ecs_cluster.application.id
  task_definition = aws_ecs_task_definition.application_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  load_balancer {
    target_group_arn = aws_lb_target_group.application.arn
    container_name   = var.app.name
    container_port   = 8065
  }

  network_configuration {
    subnets         = [aws_subnet.application_private_1.id, aws_subnet.application_private_2.id]
    security_groups = [aws_security_group.application.id]
  }

  tags = var.common_tags
}
