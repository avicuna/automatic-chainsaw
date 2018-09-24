const dev = {
    context: `http://localhost:6969/`
};

const prod = {
    context: `ec2-34-217-100-56.us-west-2.compute.amazonaws.com:6969/`
};

export const environment = process.env.NODE_ENV === "production" ? prod : dev;