variable "aws_org_id" {
  type        = string
  description = "The ID of the organisation."
  nullable    = false
}

variable "domain" {
  type        = string
  nullable    = false
  description = "The root domain under which the application will be registered."
}

variable "app_name" {
  type        = string
  nullable    = false
  description = "The name of the application. Will be used as the subdomain and to assign names to resources."
}

variable "state_bucket" {
  type        = string
  nullable    = false
  description = "The bucket in which the OpenTofu state will be stored."
}

locals {
  # The bucket in which the application will be stored.
  data_bucket = replace(lower(local.fqdn), "/\\./", "-")
  # The fully qualified domain name.
  fqdn = "${replace(lower(var.app_name), "/[^a-zA-Z0-9-]/", "")}.${var.domain}"
}
