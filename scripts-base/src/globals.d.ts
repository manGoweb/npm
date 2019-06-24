interface ComponentDefinition {
	name: string
	place?: keyof HTMLElementTagNameMap | HTMLElement
	data?: any
}

declare const DEBUG: boolean

type ComponentInitializer =
	| Array<ComponentDefinition>
	| {
			push: (definition: ComponentDefinition) => void
	  }

interface Window {
	initComponents: ComponentInitializer

	initAdminComponents: ComponentInitializer

	initStyleguideComponents: ComponentInitializer
}

declare namespace NodeJS {
	interface Global {}
}

type ComponentInitializerName = { [I in keyof Window]: I }[
	| 'initComponents'
	| 'initAdminComponents'
	| 'initStyleguideComponents']
