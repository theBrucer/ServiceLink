import ReactTooltip from "react-tooltip"


/* General tooltip format that takes in the following props:
    - description: The text that will e displayed in the tooltip
    - content: Whether icons or a button, if mouse is over will
        activate the tooltip
    - ...rest: All properites of the tooltip itself, including:
        # place (!TODO - add all options here from the react tool tip page)
        # type
        # effect
*/
export const Tooltip = ({description, content, ...rest}) => {
	return (
		<>
			<a
                data-tip={description}
				tabIndex="-1"
				href="#/"
			>
				{content}
			</a>
			<ReactTooltip
                {...rest}
            />
		</>
	)
}
