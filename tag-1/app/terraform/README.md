# Party Planner in AWS

In diesem Ordner liegen Terraform-Skripte, mit denen der Party Planner in AWS aus einem S3 Bucket heraus in einem Cloudfront CDN bereitgestellt werden kann.

## Voraussetzungen

- [OpenTofu](https://opentofu.org/)

- Ein Zertifikat in ACM mit Wildcard für Subdomains, bspw.: `*.example.org`

- Ein S3 Bucket zum Verwalten des Terraform States, bspw.: `opentofu-states`

- Ein S3 Bucket zum Hosten der Anwendung, bspw.: `party-planner-data`

## Setup

1. Variablendatei `variables.tfvars` vorbereiten (Werte können entsprechend verändert werden):

   ```tfvars
   domain       = "example.org"
   app_name     = "party-planner"
   state_bucket = "opentofu-states"
   data_bucket  = "party-planner-data"
   ```

2. Infrastruktur erstellen:

   ```sh
   tofu init -var-file variables.tfvars
   tofu apply -var-file variables.tfvars
   ```

3. Anwendung bauen:

   ```sh
   cd tag-1/app
   npm run build
   ```

4. Den Inhalt des `dist` Ordners in den `data_bucket` kopieren

> [!TIP]
> Man kann sich an den GitHub Actions orientieren, die in diesem Repository liegen.
