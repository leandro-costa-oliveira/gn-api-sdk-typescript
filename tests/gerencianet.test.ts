/* eslint-disable import/extensions */
import Gerencianet from '../index';
import constants from '../src/constants';
import Endpoints from '../src/endpoints';

jest.mock('../src/endpoints');
const MockedEndpoints = Endpoints as jest.MockedClass<typeof Endpoints>;

describe('Gerencianet constructor', () => {
	beforeEach(() => {
		MockedEndpoints.mockClear();
	});

	it('should pass client_id and client_secret to Endpoints', () => {
		const gn = new Gerencianet({
			client_id: 'my_client_id',
			client_secret: 'my_client_secret',
			sandbox: false,
		});

		const firstApi = Object.keys(constants.APIS)[0];
		const firstMethod = Object.keys(constants.APIS[firstApi as keyof typeof constants.APIS].ENDPOINTS)[0];

		MockedEndpoints.prototype.run = jest.fn().mockResolvedValue({});
		gn[firstMethod]({}, {});

		const [receivedCredentials] = MockedEndpoints.mock.calls[0];
		expect(receivedCredentials.client_id).toBe('my_client_id');
		expect(receivedCredentials.client_secret).toBe('my_client_secret');
		expect(receivedCredentials.sandbox).toBe(false);
	});

	it('should map pathCert to certificate', () => {
		const gn = new Gerencianet({
			client_id: 'id',
			client_secret: 'secret',
			sandbox: false,
			pathCert: '/path/to/cert.p12',
		});

		const firstApi = Object.keys(constants.APIS)[0];
		const firstMethod = Object.keys(constants.APIS[firstApi as keyof typeof constants.APIS].ENDPOINTS)[0];

		MockedEndpoints.prototype.run = jest.fn().mockResolvedValue({});
		gn[firstMethod]({}, {});

		const [receivedCredentials] = MockedEndpoints.mock.calls[0];
		expect(receivedCredentials.certificate).toBe('/path/to/cert.p12');
	});

	it('should map pix_cert to certificate', () => {
		const gn = new Gerencianet({
			client_id: 'id',
			client_secret: 'secret',
			sandbox: false,
			pix_cert: '/path/to/pix.p12',
		});

		const firstApi = Object.keys(constants.APIS)[0];
		const firstMethod = Object.keys(constants.APIS[firstApi as keyof typeof constants.APIS].ENDPOINTS)[0];

		MockedEndpoints.prototype.run = jest.fn().mockResolvedValue({});
		gn[firstMethod]({}, {});

		const [receivedCredentials] = MockedEndpoints.mock.calls[0];
		expect(receivedCredentials.certificate).toBe('/path/to/pix.p12');
	});

	it('should pass pemKey to Endpoints when provided', () => {
		const gn = new Gerencianet({
			client_id: 'id',
			client_secret: 'secret',
			sandbox: false,
			pemKey: '/path/to/key.pem',
		});

		const firstApi = Object.keys(constants.APIS)[0];
		const firstMethod = Object.keys(constants.APIS[firstApi as keyof typeof constants.APIS].ENDPOINTS)[0];

		MockedEndpoints.prototype.run = jest.fn().mockResolvedValue({});
		gn[firstMethod]({}, {});

		const [receivedCredentials] = MockedEndpoints.mock.calls[0];
		expect(receivedCredentials.pemKey).toBe('/path/to/key.pem');
	});

	it('should pass partnerToken to Endpoints when provided', () => {
		const gn = new Gerencianet({
			client_id: 'id',
			client_secret: 'secret',
			sandbox: false,
			partnerToken: 'my_partner_token',
		});

		const firstApi = Object.keys(constants.APIS)[0];
		const firstMethod = Object.keys(constants.APIS[firstApi as keyof typeof constants.APIS].ENDPOINTS)[0];

		MockedEndpoints.prototype.run = jest.fn().mockResolvedValue({});
		gn[firstMethod]({}, {});

		const [receivedCredentials] = MockedEndpoints.mock.calls[0];
		expect(receivedCredentials.partnerToken).toBe('my_partner_token');
	});

	it('should not include pemKey in credentials when not provided', () => {
		const gn = new Gerencianet({
			client_id: 'id',
			client_secret: 'secret',
			sandbox: false,
		});

		const firstApi = Object.keys(constants.APIS)[0];
		const firstMethod = Object.keys(constants.APIS[firstApi as keyof typeof constants.APIS].ENDPOINTS)[0];

		MockedEndpoints.prototype.run = jest.fn().mockResolvedValue({});
		gn[firstMethod]({}, {});

		const [receivedCredentials] = MockedEndpoints.mock.calls[0];
		expect(receivedCredentials.pemKey).toBeUndefined();
	});

	it('should not include partnerToken in credentials when not provided', () => {
		const gn = new Gerencianet({
			client_id: 'id',
			client_secret: 'secret',
			sandbox: false,
		});

		const firstApi = Object.keys(constants.APIS)[0];
		const firstMethod = Object.keys(constants.APIS[firstApi as keyof typeof constants.APIS].ENDPOINTS)[0];

		MockedEndpoints.prototype.run = jest.fn().mockResolvedValue({});
		gn[firstMethod]({}, {});

		const [receivedCredentials] = MockedEndpoints.mock.calls[0];
		expect(receivedCredentials.partnerToken).toBeUndefined();
	});

	it('should pass params and body to endpoints.run', () => {
		const gn = new Gerencianet({
			client_id: 'id',
			client_secret: 'secret',
			sandbox: false,
		});

		const firstApi = Object.keys(constants.APIS)[0];
		const firstMethod = Object.keys(constants.APIS[firstApi as keyof typeof constants.APIS].ENDPOINTS)[0];

		const mockRun = jest.fn().mockResolvedValue({});
		MockedEndpoints.prototype.run = mockRun;

		const params = { id: 123 };
		const body = { name: 'test' };
		gn[firstMethod](params, body);

		expect(mockRun).toHaveBeenCalledWith(firstMethod, params, body);
	});
});
