resource "aws_security_group" "application" {
  name   = var.app.name
  vpc_id = aws_vpc.application.id

  ingress {
    from_port   = 8065
    to_port     = 8065
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 8065
    to_port     = 8065
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.common_tags
}

resource "aws_security_group" "application_rds" {
  name   = "${var.app.name}-rds"
  vpc_id = aws_vpc.application.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.application.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.common_tags
}

resource "aws_security_group" "application_load_balancer" {
  name   = "${var.app.name}-load-balancer"
  vpc_id = aws_vpc.application.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 8065
    to_port     = 8065
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.common_tags
}

resource "aws_alb" "application" {
  name            = var.app.name
  subnets         = [aws_subnet.application_public_1.id, aws_subnet.application_public_2.id]
  security_groups = [aws_security_group.application_load_balancer.id]

  tags = var.common_tags
}

resource "aws_alb_listener" "http" {
  load_balancer_arn = aws_alb.application.id
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }

  tags = var.common_tags
}

resource "aws_alb_listener" "https" {
  load_balancer_arn = aws_alb.application.id
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = data.aws_acm_certificate.root.arn

  default_action {
    target_group_arn = aws_lb_target_group.application.id
    type             = "forward"
  }

  tags = var.common_tags
}

resource "aws_lb_target_group" "application" {
  name        = var.app.name
  port        = 8065
  protocol    = "HTTP"
  vpc_id      = aws_vpc.application.id
  target_type = "ip"

  health_check {
    path    = "/system/ping"
    matcher = "200-299"
    port    = "traffic-port"

    interval            = 30
    timeout             = 10
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }

  depends_on = [aws_alb.application]

  tags = var.common_tags

}

resource "aws_eip" "application" {
  tags = var.common_tags
}

resource "aws_nat_gateway" "application" {
  allocation_id = aws_eip.application.id
  subnet_id     = aws_subnet.application_public_2.id
  depends_on    = [aws_internet_gateway.application]

  tags = var.common_tags
}

resource "aws_internet_gateway" "application" {
  vpc_id = aws_vpc.application.id

  tags = var.common_tags
}
