import React from 'react'
import {OverlayTrigger, Tooltip} from "react-bootstrap";

function LinkWithTooltip({id, children, href, tooltip}) {
    return (
        <OverlayTrigger
            overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
            placement="top"
            delayShow={300}
            delayHide={150}
        >
            <a href={href}>{children}</a>
        </OverlayTrigger>
    );
}

export default LinkWithTooltip