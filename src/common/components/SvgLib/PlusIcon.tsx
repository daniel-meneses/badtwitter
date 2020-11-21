import React from 'react';

import SvgIcon from '../SvgIcon/SvgIcon';

type Props = {
    className?: string;
    onClick?: (event: any) => void;
};

const PlusIcon = (props: Props) => (
    <SvgIcon viewBox='0 0 24 24' {...props}>
        <g><path d='M19.75 11H13V4.25c0-.553-.447-1-1-1s-1 .447-1 1V11H4.25c-.553 0-1 .447-1 1s.447 1 1 1H11v6.75c0 .553.447 1 1 1s1-.447 1-1V13h6.75c.553 0 1-.447 1-1s-.447-1-1-1z' />
        </g>
    </SvgIcon>
)

export default PlusIcon;
