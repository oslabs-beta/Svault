import { getGitHubIdentity } from '../github/authorize/github.ts'
import { goto } from '$app/navigation';

const response = await getGitHubIdentity('Iv1.6735dfbc776f34b5')
      console.log('response in page.svelte:', response)
      console.log('hi')
      goto(response.headers.Location);
      
