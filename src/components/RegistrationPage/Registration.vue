<template>
    <div class="main-content">
        <v-card>
            <v-card-title>Register</v-card-title>
            <v-card-subtitle>Virtual Webinar Platform</v-card-subtitle>
            <v-col cols="12">
                <v-alert
                    type="error"
                    text
                    color="deep-orange"
                    outlined
                    v-show="error_message"
                >
                    Invalid account to register.
                </v-alert>

                <v-text-field
                    id="first_name"
                    v-model="input_first_name"
                    :error-messages="first_nameErrors"
                    label="First name"
                    required
                    outlined
                    counter="10"
                    @input="$v.input_first_name.$touch()"
                    @blur="$v.input_first_name.$touch()"
                />
                <v-text-field
                    id="middle_name"
                    v-model="input_middle_name"
                    :error-messages="middle_nameErrors"
                    label="Middle name (Optional)"
                    required
                    outlined
                    counter="10"
                    @input="$v.input_middle_name.$touch()"
                    @blur="$v.input_middle_name.$touch()"
                />
                <v-text-field
                    id="last_name"
                    v-model="input_last_name"
                    :error-messages="last_nameErrors"
                    label="Last name"
                    required
                    outlined
                    counter="10"
                    @input="$v.input_last_name.$touch()"
                    @blur="$v.input_last_name.$touch()"
                />
                <v-text-field
                    id="input_email"
                    v-model="input_email"
                    :error-messages="emailErrors"
                    label="Email"
                    required
                    outlined
                    counter="10"
                    @input="$v.input_email.$touch()"
                    @blur="$v.input_email.$touch()"
                />
                <v-text-field
                    id="input_password"
                    v-model="input_password"
                    :error-messages="passwordErrors"
                    label="Password"
                    required
                    outlined
                    counter="10"
                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show_password ? 'text' : 'password'"
                    @click:append="show_password = !show_password"
                    @input="$v.input_password.$touch()"
                    @blur="$v.input_password.$touch()"
                />
                <v-btn color="green" x-large width="100%" @click="submit()"
                    >Register Account</v-btn
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
        input_first_name: { required, maxLength: maxLength(10) },
        input_middle_name: { maxLength: maxLength(10) },
        input_last_name: { required, maxLength: maxLength(10) },
        input_email: { required, email, maxLength: maxLength(10) },
        input_password: { required, maxLength: maxLength(10) },
    },

    data() {
        return {
            input_first_name: "",
            input_middle_name: "",
            input_last_name: "",
            input_email: "",
            input_password: "",
            show_password: false,
            error_message: false,
        };
    },

    methods: {
        submit() {
            this.$v.$touch();

            this.dataToJSON(
                this.input_first_name,
                this.input_middle_name,
                this.input_last_name,
                this.input_email,
                this.input_password
            );

            if (
                this.first_nameErrors.length == 0 &&
                this.middle_nameErrors == 0 &&
                this.last_nameErrors == 0 &&
                this.emailErrors == 0 &&
                this.passwordErrors == 0
            ) {
                console.log("Valid");
                this.error_message = false;
            } else {
                console.log("Invalid");
                this.error_message = true;
            }
        },

        dataToJSON(Fname, Mname, Lname, Email, Password) {
            const data = {
                first_name: Fname,
                middle_name: Mname,
                last_name: Lname,
                email: Email,
                password: Password,
            };
            console.log(data);
        },
    },

    computed: {
        first_nameErrors() {
            const errors = [];
            if (!this.$v.input_first_name.$dirty) return errors;
            !this.$v.input_first_name.maxLength &&
                errors.push("First name must be at most 10 characters long");
            !this.$v.input_first_name.required &&
                errors.push("First name is required");
            return errors;
        },

        middle_nameErrors() {
            const errors = [];
            if (!this.$v.input_middle_name.$dirty) return errors;
            !this.$v.input_middle_name.maxLength &&
                errors.push("Middle name must be at most 10 characters long");
            return errors;
        },
        last_nameErrors() {
            const errors = [];
            if (!this.$v.input_last_name.$dirty) return errors;
            !this.$v.input_last_name.maxLength &&
                errors.push("Last name must be at most 10 characters long");
            !this.$v.input_last_name.required &&
                errors.push("Last name is required");
            return errors;
        },

        emailErrors() {
            const errors = [];
            if (!this.$v.input_email.$dirty) return errors;
            !this.$v.input_email.email && errors.push("Must be valid e-mail");
            !this.$v.input_email.maxLength &&
                errors.push("Email address must be at most 10 characters long");
            !this.$v.input_email.required && errors.push("E-mail is required");
            return errors;
        },

        passwordErrors() {
            const errors = [];
            if (!this.$v.input_password.$dirty) return errors;
            !this.$v.input_password.required &&
                errors.push("Password is required");
            !this.$v.input_password.maxLength &&
                errors.push("Password must be at most 10 characters long");
            return errors;
        },
    },
};
</script>

<style scoped>
.main-content {
    width: 100%;
    height: 100%;
    padding: 5%;

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
