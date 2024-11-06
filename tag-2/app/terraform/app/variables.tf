variable "app" {
  type = object({
    name = string
    data_bucket = object({
      name = string
    })
  })
}

variable "region" {
  type        = string
  description = "The region to deploy the application in"
  nullable    = false
}

variable "aws_org_id" {
  type        = string
  description = "The ID of the organisation"
  nullable    = false
}

variable "common_tags" {
  type = object({
    Name = string
  })
  nullable = false
}

variable "domain" {
  type     = string
  nullable = false
}
