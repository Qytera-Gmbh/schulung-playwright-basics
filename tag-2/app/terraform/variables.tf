variable "aws_org_id" {
  type        = string
  description = "The ID of the organisation"
  nullable    = false
}

variable "domain" {
  type     = string
  nullable = false
}

variable "app" {
  type = object({
    name = string
    data_bucket = object({
      name = string
    })
  })
}

variable "state_bucket" {
  type     = string
  nullable = false
}
