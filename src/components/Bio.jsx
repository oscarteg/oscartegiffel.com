import React from 'react';

const Bio = () => (
    <div class="flex-wrap text-center md:text-left md:flex-no-wrap w-full mx-auto max-w-sm shadow rounded-lg py-8 px-4 md:p-4 flex mt-8 md:mt-16 mb-4 items-center bg-grey-light">
        <div class="md:mr-12 flex-no-shrink w-full md:w-auto">
            <img src="/static/jan-788051dcc78094c95bfa06fbe7bef11a.jpg" alt="Jan D'Hollander" class="rounded-full mb-0 bio-pic" />
        </div>
        <div class="content">
            <p class="my-4">Hi, I'm <strong>Jan D'Hollander</strong>.<br />Frontend Developer with a soft spot for Craft CMS. Want get in touch? Contact me on <a href="https://twitter.com/Jan_DHollander" target="_blank" rel="nofollow noopener" class="highlight">Twitter.</a>
            </p>
        </div>
    </div>
)

export default Bio;