<template>
    <div class="main-content">
        <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-subtitle>Virtual Webinar Platform</v-card-subtitle>
            <v-col cols="12">
                <v-alert
                    type="error"
                    text
                    color="deep-orange"
                    outlined
                    v-show="error_message"
                >
                    Invalid e-mail or password.
                </v-alert>

                <v-text-field
                    id="email"
                    v-model="input_email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    outlined
                    @input="$v.input_email.$touch()"
                    @blur="$v.input_email.$touch()"
                >
                </v-text-field>
                <v-text-field
                    id="password"
                    v-model="input_password"
                    :error-messages="passwordErrors"
                    label="Password"
                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show_password ? 'text' : 'password'"
                    @click:append="show_password = !show_password"
                    required
                    outlined
                    @input="$v.input_password.$touch()"
                    @blur="$v.input_password.$touch()"
                >
                </v-text-field>
                <v-btn color="green" x-large width="100%" @click="submit()"
                    >Log In</v-btn
                >
            </v-col>
        </v-card>
    </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
    mixins: [validationMixin],

    validations: {
        input_email: { required, email },
        input_password: { required },
    },

    data() {
        return {
            input_email: "",
            input_password: "",
            show_password: false,

            error_message: false,

            valid_input: {
                input_email: "email@gmail.com",
                input_password: "password2022!",
            },
        };
    },

    methods: {
        submit() {
            if (
                this.input_email === this.valid_input.input_email &&
                this.input_password === this.valid_input.input_password
            ) {
                this.error_message = false;
            } else {
                this.error_message = true;
            }
            this.$v.$touch();
        },
    },

    computed: {
        emailErrors() {
            const errors = [];
            if (!this.$v.input_email.$dirty) return errors;
            !this.$v.input_email.email && errors.push("Must be valid e-mail");
            !this.$v.input_email.required && errors.push("E-mail is required");
            return errors;
        },

        passwordErrors() {
            const errors = [];
            if (!this.$v.input_password.$dirty) return errors;
            !this.$v.input_password.required &&
                errors.push("Password is required");
            return errors;
        },
    },
};
</script>

<style scoped>
.main-content {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}

.v-card {
    width: 40%;
    padding: 50px;
}

.v-btn {
    color: #ffff;
}
</style>
