import type { WebhookTriggerEvents } from '@prisma/client';

import { prisma } from '@documenso/prisma';

export type GetAllWebhooksByEventTriggerOptions = {
  event: WebhookTriggerEvents;
  userId: number;
  teamId?: number;
};

export const getAllWebhooksByEventTrigger = async ({
  event,
  userId,
  teamId,
}: GetAllWebhooksByEventTriggerOptions) => {
  return prisma.webhook.findMany({
    where: {
      enabled: true,
      eventTriggers: {
        has: event,
      },
      ...(teamId
        ? {
            team: {
              id: teamId,
              members: {
                some: {
                  userId,
                },
              },
            },
          }
        : {
            userId,
            teamId: null,
          }),
    },
  });
};
