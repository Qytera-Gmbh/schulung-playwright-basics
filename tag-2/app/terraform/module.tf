provider "aws" {
  alias  = "virginia"
  region = "us-east-1"
}

module "app" {
  source = "./app"
  providers = {
    aws = aws.virginia
  }

  app = var.app

  aws_org_id = var.aws_org_id

  common_tags = {
    Name = var.app.name
  }

  domain = var.domain
  region = "us-east-1"
}
