# Mattermost in AWS

In diesem Ordner liegen Terraform-Skripte, mit denen Mattermost in AWS über Fargate ECS und RDS bereitgestellt werden kann.

## Voraussetzungen

- [OpenTofu](https://opentofu.org/)

- Ein Zertifikat in ACM mit Wildcard für Subdomains, bspw.: `*.example.org`

- Ein S3 Bucket zum Verwalten des Terraform States, bspw.: `opentofu-states`

- Ein S3 Bucket als Speicherplatz für Bilder, Dateien, ... bspw.: `mattermost-data`

## Setup

1. Variablendatei `variables.tfvars` vorbereiten (Werte können entsprechend verändert werden):

   ```tfvars
   domain       = "example.org"
   app          = {
     name        = "mattermost-example-org"
     data_bucket = "mattermost-data"
   }
   state_bucket = "opentofu-states"
   aws_org_id   = "0123456789"
   ```

2. Infrastruktur erstellen:

   ```sh
   cd tag-2/app/terraform
   tofu init -var-file variables.tfvars
   tofu apply -var-file variables.tfvars
   ```

3. In der `tag-2/playwright/playwright.config.ts` die `baseURL` anpassen
