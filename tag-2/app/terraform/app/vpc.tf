resource "aws_vpc" "application" {
  cidr_block           = "10.0.0.0/24"
  enable_dns_hostnames = true

  tags = var.common_tags
}

data "aws_availability_zone" "a" {
  name = "${var.region}a"
}

data "aws_availability_zone" "b" {
  name = "${var.region}b"
}

resource "aws_subnet" "application_public_1" {
  vpc_id                  = aws_vpc.application.id
  cidr_block              = "10.0.0.0/26"
  availability_zone       = data.aws_availability_zone.a.name
  map_public_ip_on_launch = true

  tags = var.common_tags
}

resource "aws_subnet" "application_public_2" {
  vpc_id                  = aws_vpc.application.id
  cidr_block              = "10.0.0.64/26"
  availability_zone       = data.aws_availability_zone.b.name
  map_public_ip_on_launch = true

  tags = var.common_tags
}

resource "aws_subnet" "application_private_1" {
  vpc_id            = aws_vpc.application.id
  cidr_block        = "10.0.0.128/26"
  availability_zone = data.aws_availability_zone.a.name

  tags = var.common_tags
}

resource "aws_subnet" "application_private_2" {
  vpc_id            = aws_vpc.application.id
  cidr_block        = "10.0.0.192/26"
  availability_zone = data.aws_availability_zone.b.name

  tags = var.common_tags
}

resource "aws_route_table" "application_public" {
  vpc_id = aws_vpc.application.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.application.id
  }

  tags = var.common_tags
}

resource "aws_route_table" "application_private" {
  vpc_id = aws_vpc.application.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.application.id
  }

  tags = var.common_tags
}

resource "aws_route_table_association" "application_public_1" {
  subnet_id      = aws_subnet.application_public_1.id
  route_table_id = aws_route_table.application_public.id
}

resource "aws_route_table_association" "application_public_2" {
  subnet_id      = aws_subnet.application_public_2.id
  route_table_id = aws_route_table.application_public.id
}

resource "aws_route_table_association" "application_private_1" {
  subnet_id      = aws_subnet.application_private_1.id
  route_table_id = aws_route_table.application_private.id
}

resource "aws_route_table_association" "application_private_2" {
  subnet_id      = aws_subnet.application_private_2.id
  route_table_id = aws_route_table.application_private.id
}
