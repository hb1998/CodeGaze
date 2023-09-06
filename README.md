# CodeGaze: Code Screening Platform


CodeGaze is an open-source code screening platform. With CodeGaze, you can create and manage custom coding challenges, assess candidates coding skills easily.

## Features

- **Language Support**: CodeGaze currently supports three popular programming languages - JavaScript, Python, and Java. Easily create coding challenges in these languages to evaluate candidates proficiently. support for C and C++ will soon be added. 

- **Custom Test Cases**: Tailor your coding challenges by creating custom test cases for questions. This allows you to assess not only the correctness of the code but also its efficiency and edge-case handling.


## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Supabase](https://supabase.com/) 
    - the whole backend runs on supabase, its an opensouce self hostable managed database, However i would suggest you use thier free tier as its much more easier to setup.
- [Judge0](https://github.com/judge0/judge0)
    - Its an opensouce tool to run code on a remote server, this is what we use to evaluate the code, it hardly takes few minutes to get it setup and running in a docker container. 
    - [How to Setup ?](https://github.com/judge0/judge0/blob/master/CHANGELOG.md#deployment-procedure)
- Frontend is done with reactjs, nothing crazy here. 

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/visualbis/CodeGaze
   cd CodeGaze
   ```

2. Judge0 setup:
  - [Setup]((https://github.com/judge0/judge0/blob/master/CHANGELOG.md#deployment-procedure)) 
  - note down the port its running on by default, its on `2358`

3. Supabase setup
  - This is probably the most time consuming part of the setup, but worry not, you should be there if you follow the steps carefully. 
  - Basically there is no straight forward way to direcly clone/fork the supabase schema, but since its built on top of postgres, we just need to follow the steps to replicate a postgres database. 
  - Database setup
      - Before you begin.
         - Install [Supabase CLI](https://supabase.com/docs/guides/cli#installation)
         - Install [Postgres](https://www.postgresql.org/download/) so you can run psql and pg_dump
         - Install Docker Desktop for your machine, just running it would be enough, supabase CLI for some reason needs this running to properly work.
      ```sh
      cd schema
      psql -U postgres \
      --single-transaction \
      --variable ON_ERROR_STOP=1 \
      --file roles.sql \
      --file schema.sql \
      --dbname "[YOUR_DB_URL]"
      ```
      - your db url should look something like this `postgresql://postgres:[YOUR_DATABASE_PASSWORD]@db.pcwbzwtxmnjokifyndcv.supabase.co:5432/postgres` 
      - it should be available `Project > Settings > Database`. Make sure you replace your password in the url as well. 
      -  running the command should add all the tables and roles necessary. 
4.  [Edge functions setup](https://supabase.com/docs/guides/functions) 
      -  since we dont have a "backend" all our custom logic will go inside supabase edge functions, they are serverless functions which handles stuffs like creating candidate, inviting candidate since these are admin level operations, its not recommended to do these in the frontend, 
      - deploying the supabase functions is fairly easy, Login to your project with Supabase CLI 
      ```sh
      supabase login
      ```
       After you login, running 
      ```sh
      supabase functions deploy
      ```
      in the root of your project should deploy all the functions. the source code of functions is in `supabase/functions`, if it asks for project ref, you can get that form `Project > Settings > General` under Reference Id  in your supabase dashboard.
      - configuring secrets to use in edge functions 
      rename the `.env.example` file in `/supabase` to `.env` and replace the JWT_SECRET with any secret key, make sure its strong.
         ```sh
         supabase secrets set --env-file ./supabase/.env
         ```
         you can run `supabase list` to see all the secrets, other than the default ones, `JWT_SECRET` should also be there.
- Configuring the Env file. 
   - you can get supabase url and supabase anon key from `Project > Settings > API` 
   - the compiler endpoint is the ip and port in which judge0 is running.

5. Start the server:

   ```sh
   yarn install
   yarn dev
   ```

6. Navigate to the web interface:

   ```
   http://localhost:3000
   ```

### Usage

1. Create a new account from `Project > Authentication` and log in to the web portal, make sure you configure `env` variables by now.

2. Creating a Challenge.

    - A challenge is a coding question and a group of challenges can be configured to be an exam, you can send the exam's link to the candidate.

https://github.com/visualbis/CodeGaze/assets/33490801/3ecc7ecc-79d3-4f81-b129-c48c16999ede

3. Creating an Exam. 
    - An Exam can have one or more challenges and a time limit can be set.
      

https://github.com/visualbis/CodeGaze/assets/33490801/d6fb1de2-e985-451e-963b-c7061735862a

4. Inviting the Candidate to an assessment.
https://github.com/visualbis/CodeGaze/assets/33490801/b179d6ed-9114-4b5a-b44c-fe9b4a7b22e0

5. You can view the candidate's code and no. of passed tests in the dashboard.

### Note
At the moment, C and C++ are not working, the support will be soon added. 


## Contributing

We welcome contributions from the open-source community! To get started, follow these steps:

1. Fork the repository.

2. Create a new branch:

   ```sh
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them:

   ```sh
   git commit -m 'Add your feature or fix'
   ```

4. Push your changes to your fork:

   ```sh
   git push origin feature/your-feature-name
   ```

5. Create a pull request to the main repository.

## License

CodeGaze is licensed under the [MIT License](LICENSE).

## Contact

Have questions or suggestions? Feel free to reach out:

- Email: habeeburr@lumel.com
- Issue Tracker: [GitHub Issues](https://github.com/visualbis/CodeGaze/issues)

---

Thank you for choosing CodeGaze! We hope this platform helps you streamline your candidate evaluation process and make better hiring decisions.

**Happy coding!**
