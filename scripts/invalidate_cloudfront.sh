
#!/bin/bash
aws cloudfront create-invalidation --distribution-id $CF_ID --paths "/*"
