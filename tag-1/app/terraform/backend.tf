terraform {

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.67.0"
    }
  }

  backend "s3" {
    bucket = var.state_bucket
    key    = "${var.app_name}/terraform.tfstate"
    region = "eu-central-1"
  }
}
