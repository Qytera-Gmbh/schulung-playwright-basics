resource "aws_db_subnet_group" "application" {
  name       = var.app.name
  subnet_ids = [aws_subnet.application_private_1.id, aws_subnet.application_private_2.id]

  tags = var.common_tags
}

resource "random_password" "application" {
  length  = 32
  special = false
}

resource "aws_db_instance" "application" {
  allocated_storage      = 20
  availability_zone      = data.aws_availability_zone.a.id
  db_name                = var.app.name
  db_subnet_group_name   = aws_db_subnet_group.application.id
  engine                 = "postgres"
  identifier             = var.app.name
  instance_class         = "db.t4g.small"
  max_allocated_storage  = 20
  multi_az               = false
  password               = random_password.application.result
  publicly_accessible    = false
  skip_final_snapshot    = true
  username               = var.app.name
  vpc_security_group_ids = [aws_security_group.application_rds.id]
  port                   = 5432

  tags = var.common_tags
}
