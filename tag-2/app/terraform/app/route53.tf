data "aws_route53_zone" "root" {
  name = var.domain
}

resource "aws_route53_record" "application" {
  zone_id = data.aws_route53_zone.root.zone_id
  name    = "${var.app.name}.${var.domain}"
  type    = "A"

  alias {
    name                   = aws_alb.application.dns_name
    zone_id                = aws_alb.application.zone_id
    evaluate_target_health = true
  }

}
