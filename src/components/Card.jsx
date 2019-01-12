import React from 'react';
import Tag from './Tag';

const Card = ({title, date, description, tags}) => (
    <div class="card mx-auto max-w-sm p-4 mb-8 bg-white rounded-lg shadow block" href="/working-with-babel-7-and-webpack/">
        <h3 class="my-1 text-xl inline-block text-black">Working with Babel 7 and Webpack</h3>
        <span class="text-sm text-grey-darker"> - 25.09.2018</span>
        <p class="text-grey-darker my-4 text-base">
            With the recent release of Babel 7, it's the perfect time to really get to know it. A post on what Babel is, what it does and how to use it.
        </p>
        <Tag tag="Javascript"></Tag>
    </div>
)

export default Card;