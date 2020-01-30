const timeoutableFetch = (url, options = {}) => {
    let { timeout = 5000, ...rest } = options
    if (rest.signal) {
        throw new Error('Signal not supported in timeoutable fetch')
    }
    const controller = new AbortController()
    const { signal } = controller
    
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(window.location.reload())
            controller.abort()
        }, timeout)
        fetch(url, { signal, ...rest })
            .finally(() => clearTimeout(timer))
            .then((response) => {
                if (response.status !== 200) {
                    return response.text().then((text) => {
                        reject()
                    })
                }
                return response.json()
            })
            .then(resolve, reject)
            .catch(() => window.location.reload())
    })
}

export default timeoutableFetch
