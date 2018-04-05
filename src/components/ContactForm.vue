<template>
    <section>
        <b-field label="$t('message.hello')">
            <p>{{$t('message.hello')}}</p>
        </b-field>

        <b-field label="Email">
        </b-field>

        <b-field
            label="Error"
            type="is-danger"
            message="Something went wrong with this field">
            <b-select placeholder="Select a character">
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>

        <b-field label="Rounded">
            <b-select placeholder="Select a character" rounded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>

        <b-field label="Required">
            <b-select placeholder="Select a character" required>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>

        <b-field label="Loading">
            <b-select placeholder="Select a character" loading>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>

        <b-field label="Disabled">
            <b-select placeholder="Select a character" disabled>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>

        <b-field label="Disabled option">
            <b-select placeholder="Select a character">
                <option value="flint">Flint</option>
                <option value="silver" disabled>Silver</option>
            </b-select>
        </b-field>

        <b-field
            label="Expanded">
            <b-select placeholder="Select a character" expanded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>
    </section>
</template>

<script>
export default {
  name: "ContactForm"
};
</script>
