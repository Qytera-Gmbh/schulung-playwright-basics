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

variable "data_bucket" {
  type        = string
  nullable    = false
  description = "The bucket in which the application will be stored."
}

variable "state_bucket" {
  type        = string
  nullable    = false
  description = "The bucket in which the OpenTofu state will be stored."
}

locals {
  # The fully qualified domain name.
  fqdn = "${replace(lower(var.app_name), "/[^a-zA-Z0-9-]/", "")}.${var.domain}"
}
