import { ComponentConstructor, ComponentInitializationError } from './Component.js'
import { CompleteEventMap } from './componentTypes.js'

export const initializeComponents = (
	components: Array<ComponentConstructor<any, any, CompleteEventMap>>,
	initializerName: ComponentInitializerName = 'initComponents'
) => {
	const componentsByName: {
		[name: string]: ComponentConstructor<any, any, CompleteEventMap>
	} = {}

	for (let i = 0, length = components.length; i < length; i++) {
		const constructor = components[i]
		const name = constructor.componentName

		componentsByName[name] = constructor
	}

	let componentStartTime: number

	// Init function
	const init = (component: ComponentDefinition) => {
		if (component.name in componentsByName) {
			if (DEBUG) {
				componentStartTime = performance.now()
			}

			const Component = componentsByName[component.name] // class

			const placement =
				typeof component.place === 'string' ? document.querySelector(component.place) : component.place || document.body

			if (placement) {
				try {
					const instance = new Component(placement, component.props || {})

					instance.setup()
				} catch (e) {
					if (e instanceof ComponentInitializationError) {
						console.warn(`The component '${component.name}' failed to initialize. ${e.message}`)
					}
				}
			} else if (DEBUG) {
				console.warn(
					`Trying to initialize component '${component.name}' but its selector '${component.place}' was not found`
				)
			}

			if (DEBUG) {
				const componentEndTime = performance.now()
				console.log(`\tComponent: ${component.name}: ${Math.round(componentEndTime - componentStartTime)}ms`)
			}
		} else if (DEBUG) {
			console.warn(`Component with name ${component.name} was not found!`)
		}
	}

	const componentInitializer: ComponentInitializer = window[initializerName]

	// Instance only required components
	if (Array.isArray(componentInitializer)) {
		componentInitializer.map(init)
	}

	// Allow lazy init of components after page load
	window[initializerName] = {
		push: init,
	}
}
