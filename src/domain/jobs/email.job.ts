import cron from 'node-cron';

import { EmailService } from '../service/email.service';
import { MPCaseModel } from '../../data/models/mpcase.model';
import { MPCaseDataSource } from '../datasource/MPCase.datasource';
import { generateMPCaseEmailTemplate } from '../templates/email.template';

export const emailJob = () => {

    cron.schedule('*/10 * * * * *', async () => {
        const emailService = new EmailService();
        const mpCaseDataSource = new MPCaseDataSource();
        console.log("Cada 10 segundos")
        try {
            const mpCases = await MPCaseModel.find({ isSent: false });
            if (!mpCases.length) {
                console.log("No hay casos pendientes de enviar");
                return;
            }

            console.log(`procesando ${mpCases.length} casos.`);

            await Promise.all(
                mpCases.map(async (mpCase) => {
                    const htmlBody = generateMPCaseEmailTemplate(
                        mpCase.lat,
                        mpCase.lng,
                        mpCase.genre,
                        mpCase.age,
                        mpCase.creationDate
                    )
                    await emailService.sendEmail({
                        to: "jorge.carlin@bluu.tech",
                        subject: `Nuevo caso de viruela del mono`,
                        htmlBody: htmlBody
                    });
                    console.log(`Email enviado para el incidente con ID: ${mpCase._id}`)
                    await mpCaseDataSource.updateMPCase(mpCase._id.toString(), { ...mpCase, isSent: true })

                    console.log('Caso actualizado')
                }));
        } catch (error) {
            console.error("Error durante el trabajo de envio de correos")
        }
    })
}