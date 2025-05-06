import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

export const sendNewCommentNotification = async (email: string, forumTitle: string, type: 'comment' | 'like') => {
    let subject = '';
    let text = '';

    if (type === 'comment') {
        subject = `New comment on "${forumTitle}"`;
        text = `Someone commented on your forum: "${forumTitle}".`;
    } else if (type === 'like') {
        subject = `Your forum "${forumTitle}" got a new like`;
        text = `Someone liked your forum: "${forumTitle}".`;
    }

    await transporter.sendMail({
        from: '"Forum App" <noreply@forum.com>',
        to: email,
        subject,
        text
    });
};
