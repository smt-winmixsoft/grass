cd dist\adminlte

az login

$group = "grass"
$sku = "S1"
$location = "West Europe"
$plan = "grass-plan-dev"

$app = "grass-app-dev"

az webapp up `
    --html `
    --name $app `
    --resource-group $group `
    --location $location `
    --plan $plan `
    --sku $sku

