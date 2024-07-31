import {
  type MetaFunction,
  unstable_defineLoader as defineLoader,
  unstable_defineAction as defineAction,
} from '@remix-run/node';
import { Form } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const action = defineAction(async ({ request }) => {
  return await authenticator.logout(request, { redirectTo: '/login' });
});

export const loader = defineLoader(async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  return { user };
});

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix</h1>
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/quickstart"
            rel="noreferrer"
          >
            5m Quick Start
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/tutorial"
            rel="noreferrer"
          >
            30m Tutorial
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
          >
            Remix Docs
          </a>
        </li>
        <li>
          <Form method="post">
            <button>Logout</button>
          </Form>
        </li>
      </ul>
    </div>
  );
}
