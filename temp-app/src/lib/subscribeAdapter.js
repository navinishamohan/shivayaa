const defaultSuccessMessage = 'You are on the list. We will notify you before launch.'
const defaultErrorMessage = 'Unable to submit right now. Please try again shortly.'
const missingEndpointMessage = 'Newsletter is not configured yet. Please set VITE_FORMSPREE_ENDPOINT.'

export async function subscribeEmail(email) {
  const endpoint =
    import.meta.env.VITE_FORMSPREE_ENDPOINT || import.meta.env.VITE_SUBSCRIBE_ENDPOINT

  if (!endpoint) {
    return {
      ok: false,
      message: missingEndpointMessage,
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        source: 'shivayaa-couture-coming-soon',
      }),
    })

    const contentType = response.headers.get('content-type') || ''
    const payload = contentType.includes('application/json')
      ? await response.json()
      : null

    if (!response.ok) {
      const formspreeError = payload?.errors?.[0]?.message
      return {
        ok: false,
        message: formspreeError || payload?.message || defaultErrorMessage,
      }
    }

    return {
      ok: true,
      message: payload?.message || defaultSuccessMessage,
    }
  } catch {
    return {
      ok: false,
      message: defaultErrorMessage,
    }
  }
}
