import type { DataFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import _ from "lodash";
import * as Yup from "yup";
import { createContribution } from "~/models/contribution.server";

function formPathToJsPath(formPath: string): string {
  return _.join(_.map(_.split(formPath, '['), (segment, index) => index === 0 ? segment : segment.slice(0, -1)), '.')
}

function jsPathToFormPath(jsPath: string): string {
  return _.join(_.map(_.split(jsPath, '.'), (segment, index) => index === 0 ? segment : `[${segment}]`), '')
}

export async function action({ request, params: { budgetId } }: DataFunctionArgs & { params: { budgetId: string } }) {
  let data = {};
  for (const entry of await request.formData()) {
    const [name, value] = entry;
    _.set(data, formPathToJsPath(name), value);
  }

  const contributionSchema = Yup.object({
    entry: Yup.object({
      amount: Yup.number().required().min(0),
      date: Yup.date().required()
    })
  })

  let contribution;
  try {
    contribution = await contributionSchema.validate(data, { abortEarly: false });
  } catch (validationError) {
    console.log(validationError);
    let errors = {} as Record<string, string[]>;
    for (const error of (validationError as Yup.ValidationError).inner) {
      const path = jsPathToFormPath(error.path!)
      errors[path] = [...(errors[path] ?? []), ...error.errors];
    }
    return json(errors, 422);
  }

  await createContribution({ ...contribution, entry: { create: { ...contribution.entry, budgetId } } });
  return redirect(`/budgets/${budgetId}/contributions`);
}

export default function NewContribution() {
  const errors = useActionData();

  return <Form method="post">
    <span>
      <label>
        $<input type="number" name="entry[amount]" placeholder="amount" min="0" />
        {_.has(errors, 'entry[amount]') && _.join(errors['entry[amount]'], ', ')}
      </label>
      <label>
        on <input type="date" name="entry[date]" />
        {_.has(errors, 'entry[date]') && _.join(errors['entry[date]'], ', ')}
      </label>
      <input type="submit" /> <Link to="..">Cancel</Link>
    </span>
  </Form>
}
