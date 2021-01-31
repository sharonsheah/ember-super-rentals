import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import Service from '@ember/service';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

class MockRouterService extends Service {
  get currentURL() {
    return '/foo/bar?baz=true#some-section';
  }
}

module('Integration | Component | share-button', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:router', MockRouterService);
  });

  test('basic usage', async function (assert) {
    await render(hbs`<ShareButton>Tweet this!</ShareButton>`);

    assert
      .dom('a')
      .hasAttribute('target', '_blank')
      .hasAttribute('rel', 'external nofollow noopener noreferrer')
      .hasAttribute(
        'href',
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          new URL('/foo/bar?baz=true#some-section', window.location.origin)
        )}`
      )
      .hasClass('share')
      .hasClass('button')
      .containsText('Tweet this!');
  });
});
