import shootings
import unittest

class ShootingsTestCase(unittest.TestCase):

  def setUp(self):
    shootings.app.config['TESTING'] = True
    self.app = shootings.app.test_client()


  def test_js_dependencies(self):
    # Checks that the JS dependencies are always here
    res = self.app.get('/')
    assert 'jquery' in res.data
    assert 'underscore' in res.data
    assert 'backbone' in res.data

  def test_shootings_route(self):
    # Check that we never get an empty shootings list
    self.assertNotEqual(self.app.get('/shootings'),[])


if __name__ == '__main__':
  unittest.main()