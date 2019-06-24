const head = document.head
const noop = () => {}

type ScriptElementConfig = Partial<Omit<HTMLScriptElement, keyof HTMLElement>>
type ScriptConfig = ScriptElementConfig & { content: string }

export const inject = (
	options: ScriptConfig | string,
	successCallback: () => void = noop,
	failCallback: () => void = noop
) => {
	const script = document.createElement('script')

	successCallback && script.addEventListener('load', successCallback, false)
	failCallback && script.addEventListener('error', failCallback, false)
	script.type = 'text/javascript'

	if (typeof options === 'string') {
		script.src = options
		script.async = true
	} else {
		// options is an object with script attributes
		// key 'content' is alias for inline script content

		for (const key in options) {
			if (key === 'content') {
				script.appendChild(document.createTextNode(options.content))
			} else {
				const keyCast = key as keyof ScriptElementConfig

				if (options[keyCast] !== undefined) {
					;(script as any)[keyCast] = options[keyCast]
				}
			}
		}
	}

	if (head) {
		head.appendChild(script)
	}
}
