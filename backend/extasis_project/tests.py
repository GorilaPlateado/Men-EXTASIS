from django.test import SimpleTestCase


class RootRedirectTests(SimpleTestCase):
    def test_root_redirects_to_frontend(self):
        response = self.client.get('/')

        self.assertEqual(response.status_code, 302)
        self.assertRedirects(
            response,
            'http://localhost:5173/',
            fetch_redirect_response=False,
        )
